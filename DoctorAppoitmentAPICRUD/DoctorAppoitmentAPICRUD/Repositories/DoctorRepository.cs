using DoctorAppoitmentAPICRUD.Data;
using DoctorAppoitmentAPICRUD.Dtos;
using DoctorAppoitmentAPICRUD.Models;
using Microsoft.Data.SqlClient;
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
                    Location = d.Location,
                    ImageData = d.ImageData != null ? Convert.ToBase64String(d.ImageData) : null,
                    Bookings = d.Bookings.Select(b => new DoctorBookingDto
                    {
                        BookingId = b.BookingId,
                        BookingDate = b.BookingDate,
                        Status = b.Status,
                        DoctorId = b.DoctorId,
                        PatientId = b.PatientId,
                        Message = b.Message,
                        Prescription = b.ImageData!= null ? Convert.ToBase64String(b.ImageData): null,
                        PatientName = b.Patient != null ? b.Patient.Name : null, // Get Patient name if available
                        PatientImage = b.Patient != null && b.Patient.ImageData != null
                                       ? Convert.ToBase64String(b.Patient.ImageData)
                                       : null // Convert Patient image to base64 if available
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            return doctor;
        }


        public async Task<Doctor> AddAsync(DoctorRegisterDto doctorRegisterDto)
        {
            // Check if a doctor with the given email already exists
            var existingDoctor = await _context.Doctors.FirstOrDefaultAsync(d => d.Email == doctorRegisterDto.Email);

            if (existingDoctor != null)
            {
                throw new Exception("A doctor with this email already exists.");
            }

            // Process the image and convert to byte array
            IFormFile image = doctorRegisterDto.Image;
            byte[] imageBytes;
            using (var memoryStream = new MemoryStream())
            {
                await image.CopyToAsync(memoryStream);
                imageBytes = memoryStream.ToArray();
            }

            // Create a new Doctor entity
            var doctor = new Doctor
            {
                Name = doctorRegisterDto.Name,
                Specialization = doctorRegisterDto.Specialization,
                Contact = doctorRegisterDto.Contact,
                Email = doctorRegisterDto.Email,
                Organization = doctorRegisterDto.Organization,
                Gender = doctorRegisterDto.Gender,
                Password = doctorRegisterDto.Password,
                Location = doctorRegisterDto.Location,
                AvailableFrom = doctorRegisterDto.AvailableFrom,
                ImageData = imageBytes
            };

            try
            {
                // Save the doctor entity to the database
                _context.Doctors.Add(doctor);
                await _context.SaveChangesAsync();

                return doctor; // Return the created doctor entity
            }
            catch (DbUpdateException ex)
            {
                // Handle SQL unique constraint violation
                if (ex.InnerException is SqlException sqlEx && sqlEx.Number == 2627)
                {
                    throw new Exception("A doctor with this email already exists.");
                }

                // Handle other database exceptions
                throw new Exception("An error occurred while processing your request.");
            }
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
            doctor.Location = doctorRegisterDto.Location;


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
