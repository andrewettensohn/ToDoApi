using ToDoApi.Models;

namespace TodoApi.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        public string TaskName { get; set; }
        public string TaskStatus { get; set; }

        public SubTask subTask { get; set; }

    }
}