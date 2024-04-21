
const User = sequelize.define("User", {
    username: DataTypes.STRING,
    3);
const Course = sequelize.define("Course", {
    title: DataTypes.STRING,
    3);
User.hasMany(Course);

sequelize.sync().then(() => {
    User.create(1
    username: "user1", })
    .then((user) => {
        return user.createCoursel
        title: "JavaScript",
    });
    ｝）
    .then((course) => {
            console.log(course.title);
            3);
    });