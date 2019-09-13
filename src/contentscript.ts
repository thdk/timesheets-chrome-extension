import "@types/chrome";
import * as $ from "jquery";

// Banner: http://patorjk.com/software/taag/#p=display&f=Ogre&t=Protime

let isSupported = "";
let currentTabId: string | null = null;

chrome.runtime.onMessage.addListener(
    function (request: any) {
        currentTabId = request.tabId as string;
        notifyTabSupported();
    }
);

function copyToClipBoard(text: string) {
    console.log(text);
    chrome.runtime.sendMessage({
        type: 'copyToClipBoard',
        text: text
    });
}

function notifyTabSupported() {
    if (currentTabId && isSupported) {
        chrome.runtime.sendMessage({
            type: 'isSupportedResult',
            tabId: currentTabId,
            text: isSupported
        });
    }
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

if ($form.length) {
    isSupported = 'Mantis';
    notifyTabSupported();
}

$form.on('submit', () => {
    extractAndCopyToClipBoard();
});

$('form[action="bugnote_add.php"] [type="submit"]').on('click', () => {
    extractAndCopyToClipBoard();
});

function extractAndCopyToClipBoard() {
    var line = getLine();
    if (line) {
        if (confirm('Do you want to write timesheet information to your clipboard?\nThis will overwrite your clipboard.')) {
            copyToClipBoard(line);
        }
    }
};

function getProjectPath(projectName: string) {
    const projectLis = Array.from(document.querySelectorAll<HTMLLIElement>("#projects-list li"));
    const activeLi = projectLis.filter(liEl => liEl.querySelector("a")!.innerText.trim() === projectName)[0];
    if (!activeLi) console.error(`Project '${projectName}' not found`);

    const getIndentSize = (liEl: HTMLLIElement) => (liEl.querySelector("a")!.innerText.indexOf(projectName[0]) / 4);
    let indentation = getIndentSize(activeLi);
    if (indentation !== 2) console.error(`Project '${projectName}' expected on depth 2`);

    // Find parent
    let parentLi = activeLi; // logical parent (with indentation)
    let parentText = "";
    while (indentation === 2) {
        parentLi = activeLi.previousSibling as HTMLLIElement; // logical parent (with indentation)
        indentation = getIndentSize(parentLi);
        if (indentation === 1) {
            parentText = parentLi.querySelector("a")!.innerText;
        }
    }
    return parentText + " - " + projectName;
}

function getHours(timeTracking: string) {
    var parts = timeTracking.split(':')
    return parseInt(parts[0], 10) + (parseInt(parts[1], 10) / 60);
}

function getLine() {
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
        var day = new Date().getDate();
        var time = getHours(timeTracking);
        if (time !== 0) {
            var project = document.querySelector<HTMLElement>(".bug-project:not(.category)")!.innerText;
            var projectPath = getProjectPath(project);
            var details = document.querySelector<HTMLElement>(".bug-summary:nth-child(2)")!.innerText.trim() || bugId;

            var oldStateName = document.querySelector<HTMLElement>(".bug-status:not(.category)")!.innerText.trim();

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

            var task = 'Programming';

            // from 'toreview'
            if (oldStateName == 'toreview') task = 'Code review';
            else if (oldStateName == 'tostable') task = 'Mercurial';

            // from 'qa'
            else if (oldStateName == 'qa') task = 'Testing';

            // to 'developed'
            else if (status == 60) task = 'Programming';

            // to 'qa'
            else if (status == 70) task = 'Mercurial';

            // to 'stable'
            else if (status == 80) task = 'Mercurial'; // resolved
            else if (status == 90) task = 'Mercurial'; // resolved

            // If no old StateName available
            else if (status == 20) task = 'Testing'; // When developers feedback, mostly no time inserted, so Testing used
            else if (status == 63) task = 'Code review';
            else if (status == 75) task = 'Testing';

            return day + "\t" + time.toString().replace('.', ',') + "\t" + projectPath + "\t" + task + '\t\t' + details;
        }
    }

    return undefined;
}

	// Test
	// extractAndCopyToClipBoard();


