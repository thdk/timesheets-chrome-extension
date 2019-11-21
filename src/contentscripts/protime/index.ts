// ===============================================================	
//    ___           _   _                
//   / _ \_ __ ___ | |_(_)_ __ ___   ___ 
//  / /_)/ '__/ _ \| __| | '_ ` _ \ / _ \
// / ___/| | | (_) | |_| | | | | | |  __/
// \/    |_|  \___/ \__|_|_| |_| |_|\___|
// ----------------------------------------------------------------   
const $timeSheetTable = $('#G_timesheetxTimesheetGrid');
if ($timeSheetTable.length) {

    // isSupported = 'ProTime';
    // notifyTabSupported();

    let $th = $('<th class="infragisticsWebGridHeader"></th>');
    let totalDuration = 0;
    $timeSheetTable.find('tr').each((_, tr) => {
        const $tr = $(tr);
        const $td = $tr.find('td:nth-child(4), th:nth-child(4)');
        const td = $td[0];
        let $newCell: JQuery;
        if (td && td.tagName === 'TH') {
            $newCell = $th;
        } else {
            var duration = calculateWorked(getTimes(td.innerText));
            totalDuration += duration;
            $newCell = $('<td/>').text(duration ? nbrToDate(duration) : '');
        }
        $td.after($newCell);
    });

    $th.text('Worked:' + (totalDuration ? ' (' + nbrToDate(totalDuration) + ')' : ''));
}

function getTimes(innerText: string) {
    return innerText
        .replace(/\r/g, ' ')
        .replace(/\n/g, ' ')
        .replace(/\*/g, '')
        .trim()
        .split(' ')
        .filter(dayTimes => !!dayTimes) // Remove empty
}

function calculateWorked(dayTimes: string[]) {
    const durations: number[] = [];
    let prev: number;

    dayTimes
        // Convert times to numbers
        .map(dayTime => parseInt(dayTime.split(':')[0], 10) * 60 + parseInt(dayTime.split(':')[1], 10))

        // Get timespans (diff of pairs)
        .forEach((dayTime, index) => index % 2 === 0 ? prev = dayTime : durations.push(dayTime - prev))

    // Sum timestamps
    var duration = durations.reduce((prev, dayTime) => prev + dayTime, 0)

    // Subtract diner
    if (dayTimes.length == 2 && duration > 4) {
        duration -= 30;
    }

    //dayTimes.workedMin = duration;		
    return duration;
}

function nbrToDate(value: number) {
    var hours = Math.floor(value / 60);
    var mins = value - (hours * 60);
    return hours + ':' + (mins < 10 ? '0' : '') + mins;
}