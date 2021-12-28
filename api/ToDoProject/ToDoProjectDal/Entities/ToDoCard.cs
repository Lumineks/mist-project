using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoProjectDal.Entities
{
    public class ToDoCard
    {
        [Key]
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Text { get; set; }

        public bool Done { get; set; }

        public Guid Account_Id { get; set; }

        public DateTime Timestamp { get; set; }

        [ForeignKey("Account_Id")]
        public Account User { get; set; }
    }
}

