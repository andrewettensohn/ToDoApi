
namespace TodoApi.Models
{
    public class TodoItem
    {
        public int TodoItemID { get; set; }

        public string TaskName { get; set; }

        public string TaskStatus { get; set; }

        public TodoSubItem TodoSubItem { get; set; }

    }
}