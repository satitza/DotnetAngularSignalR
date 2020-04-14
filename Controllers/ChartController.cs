using DotnetAngularSignalR.Hubs;
using DotnetAngularSignalR.Services;
using DotnetAngularSignalR.TimerFeatures;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace DotnetAngularSignalR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChartController : ControllerBase
    {
        private IHubContext<ChartHub> _hub;

        public ChartController(IHubContext<ChartHub> hub)
        {
            _hub = hub;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var timerManager =
                new TimerManager(() => _hub.Clients.All.SendAsync("transferchartdata", DataManager.GetData()));

            return Ok(new {Message = "Request Completed. Start send data to hub client."});
        }
    }
}