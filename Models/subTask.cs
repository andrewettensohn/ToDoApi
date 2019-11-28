using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoApi.Models
{
    public class SubTask
    {
            public long id { get; set; }
            public string subTaskName { get; set; }

            public string subTaskStatus { get; set; }

    }
}
