using System.Text.Json.Serialization;

namespace ToDoProjectBll.Contracts.User
{
    public class UserLoginDto
    {
        [JsonPropertyName("login")]
        public string Login { get; set; }

        [JsonPropertyName("password")]
        public string Password { get; set; }
    }
}
