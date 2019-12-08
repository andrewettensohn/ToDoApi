using Microsoft.EntityFrameworkCore.Migrations;

namespace ToDoApi.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TodoItems",
                columns: table => new
                {
                    TodoItemID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TaskName = table.Column<string>(nullable: true),
                    TaskStatus = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TodoItems", x => x.TodoItemID);
                });

            migrationBuilder.CreateTable(
                name: "TodoSubItems",
                columns: table => new
                {
                    TodoSubItemID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TodoItemID = table.Column<int>(nullable: false),
                    SubTaskName = table.Column<string>(nullable: true),
                    SubTaskStatus = table.Column<string>(nullable: true),
                    SubTaskDescription = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TodoSubItems", x => x.TodoSubItemID);
                    table.ForeignKey(
                        name: "FK_TodoSubItems_TodoItems_TodoItemID",
                        column: x => x.TodoItemID,
                        principalTable: "TodoItems",
                        principalColumn: "TodoItemID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TodoSubItems_TodoItemID",
                table: "TodoSubItems",
                column: "TodoItemID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TodoSubItems");

            migrationBuilder.DropTable(
                name: "TodoItems");
        }
    }
}
