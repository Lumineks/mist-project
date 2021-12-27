using System;
using System.Text.Json.Serialization;

namespace ToDoProjectBll.Contracts.User
{
    public class AccountViewDto
    {
        public Guid Id { get; set; }

        public string Login { get; set; }

        [JsonPropertyName("mobile")]
        public string MobilePhone { get; set; }

        [JsonPropertyName("creationTime")]
        public DateTimeOffset CreationTime { get; set; }
    }
}
