using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoApi.Models
{
    public class SubTask
    {
            public long Id { get; set; }
            public string SubTaskName { get; set; }

            public string SubTaskStatus { get; set; }

    }
}
