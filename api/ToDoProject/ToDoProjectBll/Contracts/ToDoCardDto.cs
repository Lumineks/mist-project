using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoProjectBll.Contracts
{
    public class ToDoCardDto
    {
        /// <summary>
        /// Card id
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Card title
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Text on card
        /// </summary>
        public string Text { get; set; }

        /// <summary>
        /// Condition of task
        /// </summary>
        public bool Done { get; set; }
    }
}
