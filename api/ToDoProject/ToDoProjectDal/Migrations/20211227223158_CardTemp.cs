using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ToDoProjectDal.Migrations
{
    public partial class CardTemp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ToDoCard",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: true),
                    Text = table.Column<string>(type: "text", nullable: true),
                    Done = table.Column<bool>(type: "boolean", nullable: false),
                    Account_Id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ToDoCard", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ToDoCard_Accounts_Account_Id",
                        column: x => x.Account_Id,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ToDoCard_Account_Id",
                table: "ToDoCard",
                column: "Account_Id");

            migrationBuilder.CreateIndex(
                name: "IX_ToDoCard_Id",
                table: "ToDoCard",
                column: "Id",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ToDoCard");
        }
    }
}
