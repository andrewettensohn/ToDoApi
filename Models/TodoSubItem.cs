﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Models
{
    public class TodoSubItem
    {
        public int TodoSubItemID { get; set; }

        public int TodoItemID { get; set; }

        public string SubTaskName { get; set; }

        public string SubTaskStatus { get; set; }

    }
}
