/**
 * This script modifies subscription-related responses from the server.
 * It sets the subscription as active and auto-renewing.
 */
function onResponse(req, res) {
    try {
        var data = JSON.parse(res.body);
        if (data && data.data && data.data.latestReceiptInfo) {
            data.data.latestReceiptInfo.forEach(info => {
                info.autoRenewStatus = true; // Set auto-renew to true
                let oneYearFromNow = new Date();
                oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
                info.expiresDateMs = oneYearFromNow.getTime().toString(); // Extend the subscription for another year
                info.status = 1; // Set the status to active
            });
            res.body = JSON.stringify(data);
        }
    } catch (e) {
        console.log("Failed to modify the response: " + e.message);
    }
    return res;
}

// Register the handler
$done(onResponse);