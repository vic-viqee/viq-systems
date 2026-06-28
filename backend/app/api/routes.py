from __future__ import annotations

from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter, Depends, status

from app.core.settings import Settings, get_settings
from app.schemas import HealthResponse, LeadCreate, LeadReceipt, RootResponse, VersionResponse

router = APIRouter()


@router.get("/", response_model=RootResponse)
async def read_root(settings: Settings = Depends(get_settings)) -> RootResponse:
    return RootResponse(
        service=settings.app_name,
        version=settings.app_version,
        docs_url="/docs",
        contact_url="/contact",
        environment=settings.environment,
    )


@router.get("/health", response_model=HealthResponse)
async def read_health(settings: Settings = Depends(get_settings)) -> HealthResponse:
    return HealthResponse(service=settings.app_name, version=settings.app_version, status="ok")


@router.get("/version", response_model=VersionResponse)
async def read_version(settings: Settings = Depends(get_settings)) -> VersionResponse:
    return VersionResponse(service=settings.app_name, version=settings.app_version, public_site_url=settings.public_site_url)


@router.post("/contact", response_model=LeadReceipt, status_code=status.HTTP_202_ACCEPTED)
async def create_lead(
    payload: LeadCreate,
    settings: Settings = Depends(get_settings),
) -> LeadReceipt:
    intake_id = f"lead_{uuid4().hex[:12]}"
    received_at = datetime.now(timezone.utc)
    return LeadReceipt(
        status="received",
        intake_id=intake_id,
        message="Lead received. We will review the details and follow up within 24 hours.",
        next_step=f"Review the submission and contact the sender from {settings.app_name}.",
        received_at=received_at,
        package=payload.package,
    )
