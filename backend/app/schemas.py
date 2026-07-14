from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class APIKeyCreate(BaseModel):
    name: str

class APIKeyResponse(BaseModel):
    id: int
    name: str
    created_at: datetime
    key: Optional[str] = None

class LogCreate(BaseModel):
    source: str
    log_type: str
    content: str
    timestamp: Optional[datetime] = None

class LogResponse(BaseModel):
    id: int
    source: str
    log_type: str
    content: str
    timestamp: datetime
    ingested_at: datetime
    processed: bool

    class Config:
        from_attributes = True

class ThreatCreate(BaseModel):
    name: str
    description: str
    severity: str
    threat_type: str
    source_ip: Optional[str] = None
    target_ip: Optional[str] = None
    confidence_score: float
    indicators: Optional[str] = None

class ThreatResponse(BaseModel):
    id: int
    name: str
    description: str
    severity: str
    threat_type: str
    detected_at: datetime
    source_ip: Optional[str]
    target_ip: Optional[str]
    confidence_score: float
    remediation_status: str

    class Config:
        from_attributes = True

class AlertCreate(BaseModel):
    threat_id: int
    title: str
    description: str
    severity: str

class AlertUpdate(BaseModel):
    status: Optional[str] = None
    assigned_to: Optional[str] = None
    notes: Optional[str] = None

class AlertResponse(BaseModel):
    id: int
    threat_id: int
    title: str
    description: str
    status: str
    severity: str
    created_at: datetime
    updated_at: datetime
    resolved_at: Optional[datetime]
    assigned_to: Optional[str]
    notes: Optional[str]

    class Config:
        from_attributes = True
