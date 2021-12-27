using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoProjectDal.Entities
{
    public class Account
    {
        [Key]
        public Guid Id { get; set; }

        public string Login { get; set; }
       
        [MinLength(6, ErrorMessage = "Password must be minimum 6 symbols length.")]
        public string PasswordHash { get; set; }
    }
}
