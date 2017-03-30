from rr.app import app
from rr.jobs import rq

# check every 10 seconds if there are any jobs to enqueue
with app.app_context():
    scheduler = rq.get_scheduler(interval=10)
    scheduler.run()
