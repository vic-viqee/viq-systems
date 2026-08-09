from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, field_validator, model_validator


class AppInfo(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    service: str
    version: str


class RootResponse(AppInfo):
    docs_url: str
    contact_url: str
    environment: str


class HealthResponse(AppInfo):
    status: Literal["ok"]


class VersionResponse(AppInfo):
    public_site_url: str


class LeadCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str
    email: str
    business: str
    problem: str | None = None
    impact: str | None = None
    timeline: str = "Flexible, just exploring options"
    package: str | None = None
    not_sure: bool = False

    @field_validator("name", "business", "timeline")
    @classmethod
    def ensure_non_empty(cls, value: str) -> str:
        if len(value) < 2:
            raise ValueError("Must be at least 2 characters long")
        return value

    @field_validator("problem", "impact")
    @classmethod
    def ensure_non_empty_unless_exploring(cls, value: str | None) -> str | None:
        if value is not None and value != "" and len(value) < 2:
            raise ValueError("Must be at least 2 characters long")
        return value

    @model_validator(mode="after")
    def require_problem_unless_exploring(self) -> "LeadCreate":
        if not self.not_sure:
            for field in ("problem", "impact"):
                value = getattr(self, field)
                if value is None or value == "":
                    raise ValueError(
                        f"{field}: Must be at least 2 characters long"
                    )
        return self

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        if "@" not in value or value.startswith("@") or value.endswith("@"):
            raise ValueError("Must be a valid email address")
        if "." not in value.rsplit("@", 1)[-1]:
            raise ValueError("Must be a valid email address")
        return value

    @field_validator("package")
    @classmethod
    def validate_package(cls, value: str | None) -> str | None:
        allowed = {"starter", "business", "advanced"}
        if value is None or value == "":
            return None
        if value not in allowed:
            raise ValueError("Package must be starter, business, or advanced")
        return value


class LeadReceipt(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    status: Literal["received"]
    intake_id: str
    message: str
    next_step: str
    received_at: datetime
    package: str | None = None

