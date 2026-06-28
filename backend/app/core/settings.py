from __future__ import annotations

from functools import lru_cache
from os import getenv

from pydantic import BaseModel, ConfigDict, Field


def _split_csv(value: str | None) -> list[str]:
    if not value:
        return []
    return [item.strip() for item in value.split(",") if item.strip()]


class Settings(BaseModel):
    model_config = ConfigDict(frozen=True)

    app_name: str = "Viq Systems API"
    app_version: str = "0.1.0"
    environment: str = "development"
    public_site_url: str = "https://viqsystems.tech"
    cors_origins: list[str] = Field(
        default_factory=lambda: [
            "http://localhost:4173",
            "http://localhost:5173",
            "http://127.0.0.1:4173",
            "http://127.0.0.1:5173",
            "https://viqsystems.tech",
            "https://viq-systems.pages.dev",
        ]
    )


@lru_cache
def get_settings() -> Settings:
    origins = _split_csv(getenv("CORS_ORIGINS"))
    return Settings(
        app_name=getenv("APP_NAME", "Viq Systems API"),
        app_version=getenv("APP_VERSION", "0.1.0"),
        environment=getenv("APP_ENV", "development"),
        public_site_url=getenv("PUBLIC_SITE_URL", "https://viqsystems.tech"),
        cors_origins=origins,
    )

