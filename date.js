const today = new Date()

exports.getWeekDay = () => today.toLocaleDateString('en-US', {weekday: "long"})

exports.getDate = () => today.getDate()