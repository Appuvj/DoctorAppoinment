using DoctorAppoitmentAPICRUD.Data;
using DoctorAppoitmentAPICRUD.Dtos;
using DoctorAppoitmentAPICRUD.Repositories;
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
        private readonly JwtService _jwtService;
        public LoginController(HospitalContext context,JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginRequestDto loginRequest)
        {
            if (loginRequest.Role == "Admin")
            {
                if (loginRequest.Email == "admin@gmail.com" && loginRequest.Password == "Admin@2k1")
                {
                    string token = _jwtService.GenerateJwtToken(loginRequest);
                    return Ok(new { message = "Admin login successful", token = token });
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
                string token = _jwtService.GenerateJwtToken(loginRequest);
                return Ok(new { Role = "Doctor" ,Id = doctor.DoctorId, token = token });
            }
            else if (loginRequest.Role == "Patient")
            {
                var patient = await _context.Patients
                    .FirstOrDefaultAsync(p => p.Email == loginRequest.Email && p.Password == loginRequest.Password);

                if (patient == null)
                {
                    return Unauthorized("Invalid patient credentials");
                }
                string token = _jwtService.GenerateJwtToken(loginRequest);
                return Ok(new { Role = "Patient", Id = patient.PatientId, token = token });
            }
            else
            {
                return BadRequest("Invalid role specified");
            }
        }
    }
}
