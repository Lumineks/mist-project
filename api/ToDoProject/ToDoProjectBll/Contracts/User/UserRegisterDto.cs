using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ToDoProjectBll.Contracts.User
{
    public class UserRegisterDto
    {
        [JsonPropertyName("login")]
        [Required(AllowEmptyStrings = false)]
        public string Login { get; set; }
        
        [JsonPropertyName("password")]
        [Required(AllowEmptyStrings = false)]
        [MinLength(6)]
        public string Password { get; set; }
    }
}
