from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.models import Alert, AlertStatus, ThreatSeverity
from app.schemas import AlertCreate, AlertResponse, AlertUpdate
from datetime import datetime
from typing import List

router = APIRouter()

def get_db():
    from app.main import SessionLocal
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=AlertResponse)
async def create_alert(alert: AlertCreate, db: Session = Depends(get_db)):
    """Create a new alert"""
    db_alert = Alert(
        threat_id=alert.threat_id,
        title=alert.title,
        description=alert.description,
        severity=alert.severity,
        status=AlertStatus.NEW
    )
    db.add(db_alert)
    db.commit()
    db.refresh(db_alert)
    return db_alert

@router.get("/", response_model=List[AlertResponse])
async def list_alerts(
    skip: int = Query(0),
    limit: int = Query(50),
    status: str = None,
    severity: str = None,
    db: Session = Depends(get_db)
):
    """List alerts with filtering"""
    query = db.query(Alert).order_by(desc(Alert.created_at))
    
    if status:
        query = query.filter(Alert.status == status)
    if severity:
        query = query.filter(Alert.severity == severity)
    
    return query.offset(skip).limit(limit).all()

@router.get("/{alert_id}", response_model=AlertResponse)
async def get_alert(alert_id: int, db: Session = Depends(get_db)):
    """Get alert details"""
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return alert

@router.patch("/{alert_id}", response_model=AlertResponse)
async def update_alert(alert_id: int, update: AlertUpdate, db: Session = Depends(get_db)):
    """Update alert status, assignment, or notes"""
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    
    if update.status:
        alert.status = update.status
        if update.status == AlertStatus.RESOLVED:
            alert.resolved_at = datetime.utcnow()
    if update.assigned_to:
        alert.assigned_to = update.assigned_to
    if update.notes:
        alert.notes = update.notes
    
    alert.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(alert)
    return alert

@router.get("/stats/dashboard")
async def get_alert_stats(db: Session = Depends(get_db)):
    """Get alert dashboard statistics"""
    total = db.query(Alert).count()
    new = db.query(Alert).filter(Alert.status == AlertStatus.NEW).count()
    investigating = db.query(Alert).filter(Alert.status == AlertStatus.INVESTIGATING).count()
    resolved = db.query(Alert).filter(Alert.status == AlertStatus.RESOLVED).count()
    
    critical = db.query(Alert).filter(Alert.severity == ThreatSeverity.CRITICAL).count()
    high = db.query(Alert).filter(Alert.severity == ThreatSeverity.HIGH).count()
    
    return {
        "total_alerts": total,
        "new": new,
        "investigating": investigating,
        "resolved": resolved,
        "critical_severity": critical,
        "high_severity": high
    }
