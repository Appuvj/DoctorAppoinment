using DoctorAppoitmentAPICRUD.Dtos;
using DoctorAppoitmentAPICRUD.Models;
using DoctorAppoitmentAPICRUD.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DoctorAppoitmentAPICRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class BookingsController : ControllerBase
    {
        private readonly IBookingRepository _bookingRepository;

        public BookingsController(IBookingRepository bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }

        // GET: api/bookings
        [Authorize(Roles = "Admin,Doctor,Patient")]

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingGetDto>>> GetBookings()
        {
            var bookings = await _bookingRepository.GetAllAsync();
            return Ok(bookings); // Return 200 OK with the list of bookings
        }

        // GET: api/bookings/{id}
        [Authorize(Roles = "Admin,Doctor,Patient")]

        [HttpGet("{id}")]
        public async Task<ActionResult<BookingGetDto>> GetBooking(int id)
        {
            var booking = await _bookingRepository.GetByIdAsync(id);

            if (booking == null)
            {
                return NotFound(new { message = "Booking not found" }); // Return 404 Not Found if booking does not exist
            }

            return Ok(booking); // Return 200 OK with the booking details
        }

        // POST: api/bookings
        [Authorize(Roles = "Patient")]

        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] BookingPostDto bookingPostDto)
        {
            if (bookingPostDto == null)
            {
                return BadRequest(new { message = "Invalid booking data" }); // Return 400 Bad Request if the provided data is null
            }

            var createdBooking = await _bookingRepository.AddAsync(bookingPostDto);

            // Return 201 Created with the URI of the new resource and the created booking
            return CreatedAtAction(nameof(GetBooking), new { id = createdBooking.BookingId }, createdBooking);
        }

        // PUT: api/bookings/{id}
        [Authorize(Roles = "Admin,Doctor,Patient")]

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBooking(int id, [FromForm] BookingDto bookingDto)
        {
            
            

            var updatedBooking = await _bookingRepository.UpdateAsync(bookingDto,id);
            return Ok(updatedBooking); // Return 200 OK with the updated booking details
        }

        // DELETE: api/bookings/{id}
        [Authorize(Roles = "Admin")]

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var success = await _bookingRepository.DeleteAsync(id);
            if (success)
            {
                return Ok(new { message = "Booking deleted successfully" }); // Return 200 OK with success message
            }
            else
            {
                return NotFound(new { message = "Booking not found" }); // Return 404 Not Found if booking does not exist
            }
        }

        [Authorize(Roles = "Admin,Doctor,Patient")]
        [HttpGet("medicalhistory/{id}")]
        public async Task<ActionResult<IEnumerable<object>>> GetMedicalHistory(int id)
        {
            var completedBookings = await _bookingRepository.GetMedicalHistory(id);

          

            return Ok(completedBookings);
        }

         
}

}
