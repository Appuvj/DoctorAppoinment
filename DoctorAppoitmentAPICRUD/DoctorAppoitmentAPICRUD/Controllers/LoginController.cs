using DoctorAppoitmentAPICRUD.Data;
using DoctorAppoitmentAPICRUD.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DoctorAppoitmentAPICRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly HospitalContext _context;

        public LoginController(HospitalContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginRequestDto loginRequest)
        {
            if (loginRequest.Role == "Admin")
            {
                if (loginRequest.Email == "admin@gmail.com" && loginRequest.Password == "Admin@2k1")
                {
                    return Ok("Admin login successful");
                }
                else
                {
                    return Unauthorized("Invalid admin credentials");
                }
            }
            else if (loginRequest.Role == "Doctor")
            {
                var doctor = await _context.Doctors.FirstOrDefaultAsync(d => d.Email == loginRequest.Email && d.Password == loginRequest.Password);

                if (doctor == null)
                {
                    return Unauthorized("Invalid doctor credentials");
                }

                return Ok(new { Role = "Doctor" });
            }
            else if (loginRequest.Role == "Patient")
            {
                var patient = await _context.Patients
                    .FirstOrDefaultAsync(p => p.Email == loginRequest.Email && p.Password == loginRequest.Password);

                if (patient == null)
                {
                    return Unauthorized("Invalid patient credentials");
                }

                return Ok(new { Role = "Patient", Id = patient.PatientId });
            }
            else
            {
                return BadRequest("Invalid role specified");
            }
        }
    }
}
