using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;
using ToDoProjectBll.Contracts;
using ToDoProjectDal.Entities;

namespace ToDoProjectBll.Mappers
{
    public class CardMapper
    {
        public static ToDoCard Map(ToDoCardDto obj)
        {
            return obj == null
                ? null
                : new ToDoCard
                {
                    Title = obj.Title,
                    Text = obj.Text,
                    Done = obj.Done,
                    Timestamp = obj.Timestamp
                };
        }

        public static ToDoCardDto Map(ToDoCard obj)
        {
            return obj == null
                ? null
                : new ToDoCardDto
                {
                    Id = obj.Id,
                    Title = obj.Title,
                    Text = obj.Text,
                    Done = obj.Done,
                    Timestamp = obj.Timestamp
                };
        }
    }
}

