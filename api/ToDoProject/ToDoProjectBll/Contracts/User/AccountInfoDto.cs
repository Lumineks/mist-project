using System;

namespace ToDoProjectBll.Contracts.User
{
    public class AccountInfoDto
    {
        /// <summary>
        /// Account username
        /// </summary>
        public string Login { get; set; }

        /// <summary>
        /// Users mobile phone
        /// </summary>
        public string MobilePhone { get; set; }

        /// <summary>
        /// The link to auto-generated user avatar
        /// </summary>
        public string AvatarLink { get; set; }

        /// <summary>
        /// Date and Time of account creation
        /// </summary>
        public DateTimeOffset AccountCreationTime { get; set; }
    }
}
