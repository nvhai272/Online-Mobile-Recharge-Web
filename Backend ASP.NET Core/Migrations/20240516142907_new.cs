using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Online_Mobile_Recharge.Migrations
{
    /// <inheritdoc />
    public partial class @new : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "user_service");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "user_service");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "user_service",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "user_service",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
