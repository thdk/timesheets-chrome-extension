import { IMantisRelationship } from "../contentscripts/mantis/types";

/* {"expand":"renderedFields,names,schema,operations,editmeta,changelog,versionedRepresentations",
"id":"10120",
"self":"http://jira/rest/api/latest/issue/10120",
"key":"WEB-120",
"fields":{
    "issuetype":{
        "self":"http://jira/rest/api/2/issuetype/10001",
        "id":"10001","description":"Created by Jira Software - do not edit or delete. Issue type for a user story.",
        "iconUrl":"http://jira/images/icons/issuetypes/story.svg",
        "name":"Story",
        "subtask":false
    },"components":[],
    "timespent":null,
    "timeoriginalestimate":null,
    "description":"font size is not equal in all pop ups\r\n\r\nshould be 14px in all pop-ups\r\n\r\nadd element to general-confirm-dialog-message\r\n\r\nalign text to title\r\n\r\n[http://mantis/tracker/view.php?id=30713]",
    "project":{
        "self":"http://jira/rest/api/2/project/10000",
        "id": "10000",
        "key":"WEB",
        "name":"WEB",
        "projectTypeKey":"software",
        "avatarUrls":{"48x48":"http://jira/secure/projectavatar?avatarId=10324",
        "24x24":"http://jira/secure/projectavatar?size=small&avatarId=10324",
        "16x16":"http://jira/secure/projectavatar?size=xsmall&avatarId=10324",
        "32x32":"http://jira/secure/projectavatar?size=medium&avatarId=10324"}},
        "fixVersions":[],
        "aggregatetimespent":null,
        "resolution":null,
        "timetracking":{},
        "customfield_10105":"0|i000dw:",
        "customfield_10106":null,
        "attachment":[{"self":"http://jira/rest/api/2/attachment/10103",
        "id":"10103",
        "filename":"pop-up.PNG",
        "author":{
            "self":"http://jira/rest/api/2/user?username=phaedra",
            "name":"phaedra",
            "key":"phaedra",
            "emailAddress":"phaedra.schelpe@smartphoto.com",
            "avatarUrls":{
                "48x48":"https://www.gravatar.com/avatar/e555c43a8ab779102d4d6de24dbd0b91?d=mm&s=48",
                "24x24":"https://www.gravatar.com/avatar/e555c43a8ab779102d4d6de24dbd0b91?d=mm&s=24",
                "16x16":"https://www.gravatar.com/avatar/e555c43a8ab779102d4d6de24dbd0b91?d=mm&s=16",
                "32x32":"https://www.gravatar.com/avatar/e555c43a8ab779102d4d6de24dbd0b91?d=mm&s=32"},
                "displayName":"Phaedra Schelpe",
                "active":true,
                "timeZone":"Europe/Paris"
            },
            "created":"2019-09-26T08:03:41.102+0200",
            "size":100476,
            "mimeType":"image/png",
            "content":"http://jira/secure/attachment/10103/pop-up.PNG",
            "thumbnail":"http://jira/secure/thumbnail/10103/_thumb_10103.png"
        },
        {
            "self":"http://jira/rest/api/2/attachment/10102",
            "id":"10102",
            "filename":"pop-up2.PNG",
            "author":{
                "self":"http://jira/rest/api/2/user?username=phaedra",
                "name":"phaedra",
                "key":"phaedra",
                "emailAddress":"phaedra.schelpe@smartphoto.com",
                "avatarUrls":{
                    "48x48":"https://www.gravatar.com/avatar/e555c43a8ab779102d4d6de24dbd0b91?d=mm&s=48",
                    "24x24":"https://www.gravatar.com/avatar/e555c43a8ab779102d4d6de24dbd0b91?d=mm&s=24",
                    "16x16":"https://www.gravatar.com/avatar/e555c43a8ab779102d4d6de24dbd0b91?d=mm&s=16",
                    "32x32":"https://www.gravatar.com/avatar/e555c43a8ab779102d4d6de24dbd0b91?d=mm&s=32"
                },
                "displayName":"Phaedra Schelpe",
                "active":true,
                "timeZone":"Europe/Paris"
            },
            "created":"2019-09-26T08:03:41.118+0200",
            "size":70234,
            "mimeType":"image/png",
            "content":"http://jira/secure/attachment/10102/pop-up2.PNG",
            "thumbnail":"http://jira/secure/thumbnail/10102/_thumb_10102.png"
        }
    ],
    "aggregatetimeestimate":null,
    "resolutiondate":null,
    "workratio":-1,
    "summary":"Optimization pop-ups creator",
    "lastViewed":null,
    "watches":{        
        "self":"http://jira/rest/api/2/issue/WEB-120/watchers"
        ,"watchCount":1,
        "isWatching":false
    },
    "creator":{
        "self":"http://jira/rest/api/2/user?username=phaedra",
        "name":"phaedra",
        "key":"phaedra",
        "emailAddress":"phaedra.schelpe@smartphoto.com",
        "avatarUrls":{
            "48x48":"https://www.gravatar.com/avatar/e555c43a8ab779102d4d6de24dbd0b91?d=mm&s=48",
            "24x24":"https://www.gravatar.com/avatar/e555c43a8ab779102d4d6de24dbd0b91?d=mm&s=24",
            "16x16":"https://www.gravatar.com/avatar/e555c43a8ab779102d4d6de24dbd0b91?d=mm&s=16",
            "32x32":"https://www.gravatar.com/avatar/e555c43a8ab779102d4d6de24dbd0b91?d=mm&s=32"
        },
        "displayName":"Phaedra Schelpe"
        ,"active":true
        ,"timeZone":"Europe/Paris"
    },
    "subtasks":[],
    "created":"2019-09-26T08:03:43.036+0200",
    "reporter":{
        "self":"http://jira/rest/api/2/user?username=phaedra",
        "name":"phaedra",
        "key":"phaedra",
        "emailAddress":"phaedra.schelpe@smartphoto.com",
        "avatarUrls":{
            "48x48":"https://www.gravatar.com/avatar/e555c43a8ab779102d4d6de24dbd0b91?d=mm&s=48",
            "24x24":"https://www.gravatar.com/avatar/e555c43a8ab779102d4d6de24dbd0b91?d=mm&s=24",
            "16x16":"https://www.gravatar.com/avatar/e555c43a8ab779102d4d6de24dbd0b91?d=mm&s=16",
            "32x32":"https://www.gravatar.com/avatar/e555c43a8ab779102d4d6de24dbd0b91?d=mm&s=32"
        },
        "displayName":"Phaedra Schelpe",
        "active":true,
        "timeZone":"Europe/Paris"
    },
    "customfield_10000":"{}",
    "aggregateprogress":{
        "progress":0,
        "total":0
    },"priority":{
        "self":"http://jira/rest/api/2/priority/3",
        "iconUrl":"http://jira/images/icons/priorities/medium.svg",
        "name":"Medium",
        "id":"3"
    },"customfield_10100":null,
    "customfield_10101":null,
    "labels":["Creator"],
    "environment":null,
    "timeestimate":null,
    "aggregatetimeoriginalestimate":null,
    "versions":[],
    "duedate":null,
    "progress":{
        "progress":0,
        "total":0
    },
    "comment":{"comments":[],"maxResults":0,"total":0,"startAt":0},
    "issuelinks":[],
    "votes":{"self":"http://jira/rest/api/2/issue/WEB-120/votes","votes":0,"hasVoted":false},
    "worklog":{"startAt":0,"maxResults":20,"total":0,"worklogs":[]},
    "assignee":null,
    "updated":"2019-09-26T08:03:49.025+0200",
    "status":{
        "self":"http://jira/rest/api/2/status/10000",
        "description":"",
        "iconUrl":"http://jira/",
        "name":"To Do",
        "id":"10000",
        "statusCategory":{
            "self":"http://jira/rest/api/2/statuscategory/2"
            ,"id":2,
            "key":"new",
            "colorName":"blue-gray",
            "name":"To Do"
        }
    }
}
}"
*/

export const getIssueAsync = (id: string) => {
    return fetch(`http://jira/rest/api/latest/issue/${id}`)
        .then(data => data.json())
        .then(result => {
            const { fields: {
                assignee,
                project,
                status,
                summary: title,
            }, key } = result;

            const mantisIssue: IMantisRelationship = {
                assignee: assignee ? assignee.name : "",
                id: key,
                project: project ? project.name : "",
                status: status ? status.name : "",
                title,
                type: "related to jira",
            };

            return mantisIssue;
        })
}