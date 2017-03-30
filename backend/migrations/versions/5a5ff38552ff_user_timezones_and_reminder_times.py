"""User timezones and reminder times

Revision ID: 5a5ff38552ff
Revises: caf243e44c46
Create Date: 2017-03-28 00:22:26.446457

"""
from alembic import op
import sqlalchemy as sa


revision = '5a5ff38552ff'
down_revision = 'caf243e44c46'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('users', sa.Column('reminder_time', sa.Time(), nullable=False, server_default='09:00:00'))
    op.add_column('users', sa.Column('timezone', sa.String(length=200), nullable=False, server_default='US/Central'))


def downgrade():
    op.drop_column('users', 'timezone')
    op.drop_column('users', 'reminder_time')
