namespace ToDoProjectBll.Contracts.Permissions
{
    public class Roles
    {
        public const string Admin = "ADMIN";

        public const string User = "USER";

        public const string AdminOrUser = Admin + "," + User;
    }
}
