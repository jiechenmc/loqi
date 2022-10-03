from core import toxicity_of
from fastapi import FastAPI, Body
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET, POST"],
    allow_headers=["*"],
)


@app.get("/", include_in_schema=False)
async def read_root():
    return RedirectResponse("/docs")


@app.post("/api/toxicity")
async def analyze_message(req=Body()):
    # curl http://localhost:8000/api/toxicity  -H 'Content-Type: application/json' -d '{"message":"####fuck you"}'
    msg = req["message"]
    return {"source": msg, "toxicity": float(toxicity_of(msg))}
