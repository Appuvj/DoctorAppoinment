using DoctorAppoitmentAPICRUD.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DoctorAppoitmentAPICRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {

        private readonly HospitalContext _context;

        public AdminController(HospitalContext context)
        {
            _context = context;
        }

        [HttpGet("dashboard-stats")]
        public async Task<IActionResult> GetDashboardStats()
        {
            var patientsCount = await _context.Patients.CountAsync();
            var doctorsCount = await _context.Doctors.CountAsync();
            var totalAppointments = await _context.Bookings.CountAsync();

            var pendingAppointments = await _context.Bookings.CountAsync(b => b.Status == "pending");
            var bookedAppointments = await _context.Bookings.CountAsync(b => b.Status == "booked");
            var completedAppointments = await _context.Bookings.CountAsync(b => b.Status == "completed");

            var stats = new
            {
                PatientsCount = patientsCount,
                DoctorsCount = doctorsCount,
                TotalAppointments = totalAppointments,
                PendingAppointments = pendingAppointments,
                BookedAppointments = bookedAppointments,
                CompletedAppointments = completedAppointments
            };

            return Ok(stats);
        }


    }
}
