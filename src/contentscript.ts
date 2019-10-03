import "@types/chrome";
import $ from "jquery";
import { ITimesheetLine } from "./interfaces";
import { IMantisRelationship } from "./contentscripts/mantis/types";

chrome.runtime.onMessage.addListener((message) => {
    console.log(JSON.stringify({ message }, undefined, "  "));

    switch (message.type) {
        case "fetch-jira-issue-success": {
            insertRelationShip(message.issue);
        }
    }
});

function newRegistration(line: ITimesheetLine) {
    console.log(JSON.stringify({ line }, undefined, "  "));
    chrome.runtime.sendMessage({
        type: 'newRegistration',
        line,
    });
}

// ===============================================================
// 	                   _   _     
//   /\/\   __ _ _ __ | |_(_)___ 
//  /    \ / _` | '_ \| __| / __|
// / /\/\ \ (_| | | | | |_| \__ \
// \/    \/\__,_|_| |_|\__|_|___/
//                              
// ----------------------------------------------------------------
var $form = $('form[action="bug_update.php"], form[action="bugnote_add.php"], form[action="bugnote_update.php"]');

$form.on('submit', () => {
    extractAndCopyToClipBoard();
});

function extractAndCopyToClipBoard() {
    var line = getLine();
    if (line) {
        newRegistration(line);
    }
};

function getHours(timeTracking: string) {
    var parts = timeTracking.split(':')
    return parseInt(parts[0], 10) + (parseInt(parts[1], 10) / 60);
}

function getLine(): ITimesheetLine | undefined {
    var bugId = $form.find('input[name="bug_id"]').val();
    if (!bugId) { //bugnote_update.php
        // "http://mantis/mantisbt-1.2.11/view.php?id=22335"
        var index = document.referrer.indexOf('?id=');
        if (index >= 0) {
            bugId = document.referrer.substring(index + 4);
        }
    }

    var timeTracking = ($form.find('input[name="time_tracking"]').val() || "").toString();
    var status = $form.find('input[name="status"]').val();

    if (bugId && timeTracking) {
        bugId = bugId.toString();
        const date = new Date();
        const time = getHours(timeTracking);
        if (time !== 0) {
            const projectEl = document.querySelector<HTMLElement>(".bug-project:not(.category)");
            const project = projectEl ? projectEl.innerText.trim() : "";
            const description = document.querySelector<HTMLElement>(".bug-summary:nth-child(2)")!.innerText.trim() || bugId;

            const oldStateName = document.querySelector<HTMLElement>(".bug-status:not(.category)")!.innerText.trim();

            /* 
            * status: 
            * 10:new,
            * 15:waiting,
            * 20:feedback,
            * 50:assigned,
            * 60:developed,
            * 62:toreview,
            * 63:reviewed,
            * 65:totest,
            * 70:qa,
            * 75:tostable,
            * 80:resolved,
            * 90:closed';
            */

            let task: string | undefined = undefined;

            // from 'toreview'
            if (oldStateName === 'toreview') task = 'Code review';
            else if (oldStateName === 'tostable') task = 'Mercurial';

            // from 'qa'
            else if (oldStateName === 'qa') task = 'Testing';

            // to 'developed'
            else if (status === 60) task = 'Programming';

            // to 'qa'
            else if (status === 70) task = 'Mercurial';

            // to 'stable'
            else if (status === 80) task = 'Mercurial'; // resolved
            else if (status === 90) task = 'Mercurial'; // resolved

            // If no old StateName available
            else if (status === 20) task = 'Testing'; // When developers feedback, mostly no time inserted, so Testing used
            else if (status === 63) task = 'Code review';
            else if (status === 75) task = 'Testing';

            return {
                date,
                time,
                project,
                task,
                description,
            };
        }
    }

    return undefined;
}

function scrapePageForJiraIssues() {
    const $bugnotesWithJiraIssues = $(".bugnote-note.bugnote-public:contains(WEB-)");

    const issueSet = new Set<string>();
    $bugnotesWithJiraIssues.each((_, el) => {
        const matches = el.innerText.match(/WEB-\w+/g);
        if (!matches) return;
        matches.forEach(match => {
            issueSet.add(match);
        });
    });

    if (issueSet.size) {
        Array.from(issueSet.values()).forEach(id => {
            chrome.runtime.sendMessage({
                type: 'request-fetch-jira-issue',
                issueId: id
            });
        })
    }
}

function insertRelationShip(relation: IMantisRelationship) {
    const relationshipsContainerEl = document.querySelector("#relationships");

    if (!relationshipsContainerEl) return;
    const hasRelationsships = !!relationshipsContainerEl.querySelector(".widget-main");

    if (!hasRelationsships) {
        const bodyEl = relationshipsContainerEl.querySelector(".widget-body");
        if (!bodyEl) return;

        bodyEl.insertAdjacentHTML("beforeend", `
        <div class="widget-main no-padding">
            <div class="table-responsive">
                <table class="table table-bordered table-condensed table-hover">
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
        `)
    }

    const tableBodyEl = relationshipsContainerEl.querySelector("tbody");
    if (!tableBodyEl) return;

    const { assignee, project, status, title, type, id } = relation;
    tableBodyEl.insertAdjacentHTML("afterbegin", `
    <tr>
        <td><span class="nowrap">${type}</span></td>
        <td><a href="http://jira/browse/${id}">${id}</a></td>
        <td>${status}</td>
        <td>${assignee}</td>
        <td>${project}</td>
        <td>${title}</td>
    </tr>`)
}

scrapePageForJiraIssues();
