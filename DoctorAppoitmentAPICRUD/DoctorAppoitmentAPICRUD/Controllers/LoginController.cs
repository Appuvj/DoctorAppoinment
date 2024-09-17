using DoctorAppoitmentAPICRUD.Data;
using DoctorAppoitmentAPICRUD.Dtos;
using DoctorAppoitmentAPICRUD.Models;
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


        [HttpPost ("forgot-password")]
        public async Task<IActionResult> ResetPasswordAsync(ForgotPasswordRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.NewPassword) ||
                string.IsNullOrWhiteSpace(request.UserType))
            {
                return BadRequest();
            }

            if (request.UserType == "Doctor")
            {
                var doctor = await _context.Doctors.FirstOrDefaultAsync(d => d.Email == request.Email);
                if (doctor == null) return NotFound();
                doctor.Password = request.NewPassword;
                _context.Doctors.Update(doctor);
            }
            else if (request.UserType == "Patient")
            {
                var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Email == request.Email);
                if (patient == null) return NotFound();
                patient.Password = request.NewPassword;
                _context.Patients.Update(patient);

            }
            else
            {
                return BadRequest(); // Invalid user type
            }

            try
            {
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }


        [HttpPost("ContactForm")]
        public async Task<IActionResult> PostContactForm([FromBody] ContactForm contactForm)
        {
            if (ModelState.IsValid)
            {
                _context.ContactForms.Add(contactForm);
                await _context.SaveChangesAsync();
                return Ok(contactForm);
            }

            return BadRequest(ModelState);
        }

    }
}
