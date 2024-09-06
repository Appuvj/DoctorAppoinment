using DoctorAppoitmentAPICRUD.Data;
using DoctorAppoitmentAPICRUD.Dtos;
using DoctorAppoitmentAPICRUD.Models;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;

namespace DoctorAppoitmentAPICRUD.Repositories
{
    public class DoctorRepository : IDoctorRepository
    {
        private readonly HospitalContext _context;

        public DoctorRepository(HospitalContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Doctor>> GetAllAsync()
        {
            return await _context.Doctors.Include(d => d.Bookings).ToListAsync();
        }

        public async Task<DoctorGetById> GetByIdAsync(int id)
        {
            var doctor = await _context.Doctors
         .Include(d => d.Bookings)
         .ThenInclude(b => b.Patient) // Include related Patient for each booking
         .Where(d => d.DoctorId == id)
         .Select(d => new DoctorGetById
         {
             DoctorId = d.DoctorId,
             Name = d.Name,
             Specialization = d.Specialization,
             Contact = d.Contact,
             Email = d.Email,
             Organization = d.Organization,
             Gender = d.Gender,
             Password = d.Password,
             AvailableFrom = d.AvailableFrom,
             ImageData = d.ImageData != null ? Convert.ToBase64String(d.ImageData) : null,
             Bookings = d.Bookings.Select(b => new DoctorBookingDto
             {
                 BookingId = b.BookingId,
                 BookingDate = b.BookingDate,
                 PatientName = b.Patient != null ? b.Patient.Name : null // Get Patient name if available
             }).ToList()
         })
         .FirstOrDefaultAsync();

            return doctor;
        }

        public async Task<Doctor> AddAsync(DoctorRegisterDto doctorRegisterDto)
        {
            var doctorDto = new DoctorDto();
            IFormFile image = doctorRegisterDto.Image;

            
            using var memoryStream = new MemoryStream();
            await image.CopyToAsync(memoryStream);
            var imageBytes = memoryStream.ToArray();

            doctorDto.Name = doctorRegisterDto.Name;
            doctorDto.Specialization = doctorRegisterDto.Specialization;
            doctorDto.Contact = doctorRegisterDto.Contact;
            doctorDto.Email = doctorRegisterDto.Email;
            doctorDto.Organization = doctorRegisterDto.Organization;
            doctorDto.Gender = doctorRegisterDto.Gender;
            doctorDto.Password = doctorRegisterDto.Password;
            doctorDto.AvailableFrom = doctorRegisterDto.AvailableFrom;
            doctorDto.ImageData = imageBytes;

            var doctor = new Doctor
            {
                Name = doctorDto.Name,
                Specialization = doctorDto.Specialization,
                Contact = doctorDto.Contact,
                Email = doctorDto.Email,
                Organization = doctorDto.Organization,
                Gender = doctorDto.Gender,
                Password = doctorDto.Password,
                AvailableFrom = doctorDto.AvailableFrom,
                ImageData = doctorDto.ImageData
            };

            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();
            return doctor;
        }

        public async Task<Doctor> UpdateAsync( DoctorRegisterDto doctorRegisterDto,int id)
        {
            IFormFile image = doctorRegisterDto.Image;


            using var memoryStream = new MemoryStream();
            await image.CopyToAsync(memoryStream);
            var imageBytes = memoryStream.ToArray();
            var doctor = await _context.Doctors.FindAsync(id);
            doctor.Name = doctorRegisterDto.Name;
            doctor.Specialization = doctorRegisterDto.Specialization;
            doctor.Contact = doctorRegisterDto.Contact;
            doctor.Organization = doctorRegisterDto.Organization;
            doctor.Gender = doctorRegisterDto.Gender;
            doctor.Password = doctorRegisterDto.Password;
            doctor.AvailableFrom = doctorRegisterDto.AvailableFrom;
            doctor.ImageData = imageBytes;


            _context.Doctors.Update(doctor);
            await _context.SaveChangesAsync();
            return doctor;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null)
            {
                return false;
            }

            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
