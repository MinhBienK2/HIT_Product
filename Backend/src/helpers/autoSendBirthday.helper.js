const CronJob = require("cron").CronJob; // auto with time
const { User } = require("../models");

const auto = () => {
    var job = new CronJob(
        "* * 07 * * *",
        async () => {
            try {
                const users = await User.find({
                    // used as aggregation
                    $expr: {
                        $and: [
                            {
                                $eq: [
                                    { $dayOfMonth: "$birthday" },
                                    { $dayOfMonth: new Date() },
                                ],
                            },
                            {
                                $eq: [
                                    { $month: "$birthday" },
                                    { $month: new Date() },
                                ],
                            },
                        ],
                    },
                });

                // console.log(users);
                const allPromises = users.map(async (user) => {
                    console.log(user);
                    await user.autoSendBirthday();
                    console.log("send success");
                });
                await Promise.all(allPromises);
            } catch (err) {
                console.log(err);
            }
        },
        null,
        true,
        // "America/Los_Angeles"
        "Asia/Ho_Chi_Minh"
    );

    job.start;
};

module.exports = auto;
