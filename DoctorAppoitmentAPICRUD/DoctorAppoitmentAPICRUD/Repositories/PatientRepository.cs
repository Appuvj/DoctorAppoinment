using DoctorAppoitmentAPICRUD.Data;
using DoctorAppoitmentAPICRUD.Dtos;
using DoctorAppoitmentAPICRUD.Models;
using Microsoft.EntityFrameworkCore;
using System.Formats.Tar;
using System.Net;
using System.Reflection;

namespace DoctorAppoitmentAPICRUD.Repositories
{
    public class PatientRepository : IPatientRepository
    {
        private readonly HospitalContext _context;

        public PatientRepository(HospitalContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Patient>> GetAllAsync()
        {
            return await _context.Patients.Include(p => p.Bookings).ToListAsync();
        }

        public async Task<PatientGetByIdDto> GetByIdAsync(int id)
        {
            var patient = await _context.Patients
        .Include(p => p.Bookings)
        .ThenInclude(b => b.Doctor) // Include related Doctor for each booking
        .Where(p => p.PatientId == id)
        .Select(p => new PatientGetByIdDto
        {
            PatientId = p.PatientId,
            Name = p.Name,
            Email = p.Email,
            Contact = p.Contact,
            Address = p.Address,
            Gender = p.Gender,
            Password = p.Password,
            Image = p.ImageData != null ? Convert.ToBase64String(p.ImageData) : null,
            Bookings = p.Bookings.Select(b => new BookingGetId
            {
                BookingId = b.BookingId,
                BookingDate = b.BookingDate,
                Status = b.Status,
                DoctorId = b.DoctorId,
                DoctorName = b.Doctor != null ? b.Doctor.Name : null, // Get Doctor name if available
                PatientId = b.PatientId,
                PatientName = p.Name // Patient name from the parent object
            }).ToList()
        })
        .FirstOrDefaultAsync();

            return patient;
        }

        public async Task<Patient> AddAsync(PatientRegisterDto patientRegisterDto)
        {
            IFormFile image = patientRegisterDto.Image;


            using var memoryStream = new MemoryStream();
            await image.CopyToAsync(memoryStream);
            var imageBytes = memoryStream.ToArray();

            var patientDto = new PatientDto();

            patientDto.Name = patientRegisterDto.Name;
            patientDto.Contact = patientRegisterDto.Contact;
            patientDto.Email = patientRegisterDto.Email;
            



            var patient = new Patient
            {
                Name = patientDto.Name,
                Email = patientDto.Email,
                Contact = patientDto.Contact,
                Address = patientRegisterDto.Address,
                Gender = patientRegisterDto.Gender,
                Password = patientRegisterDto.Password,
                ImageData = imageBytes

                

            };

            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();
            return patient;
        }

        public async Task<Patient> UpdateAsync(PatientRegisterDto patientRegisterDto,int id)
        {
            IFormFile image = patientRegisterDto.Image;


            using var memoryStream = new MemoryStream();
            await image.CopyToAsync(memoryStream);
            var imageBytes = memoryStream.ToArray();



            var patient = await _context.Patients.FindAsync(id);

            patient.Name = patientRegisterDto.Name;
            patient.Email = patientRegisterDto.Email;
            patient.Contact = patientRegisterDto.Contact;
            patient.Address = patientRegisterDto.Address;
            patient.Gender = patientRegisterDto.Gender;
            patient.Password = patientRegisterDto.Password;
            patient.ImageData = imageBytes;

            _context.Patients.Update(patient);
            await _context.SaveChangesAsync();
            return patient;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
            {
                return false;
            }

            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
