"""empty message

Revision ID: 18763ebe6919
Revises: 2ad268154e86
Create Date: 2025-03-12 20:03:20.044805

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '18763ebe6919'
down_revision = '2ad268154e86'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('gallery_home',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('image_url', sa.String(length=256), nullable=False),
    sa.Column('contents', sa.Text(), nullable=True),
    sa.Column('comment', sa.JSON(), nullable=True),
    sa.Column('like', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('inquiry',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('subject', sa.String(length=200), nullable=False),
    sa.Column('message', sa.Text(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('phone', sa.String(length=50), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('inventory',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('bot_id', sa.Integer(), nullable=False),
    sa.Column('item', sa.String(length=100), nullable=False),
    sa.Column('location', sa.String(length=100), nullable=False),
    sa.Column('list', sa.JSON(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('gallery_admin',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('image_url', sa.String(length=256), nullable=False),
    sa.Column('username', sa.String(length=120), nullable=False),
    sa.Column('tag', sa.String(length=100), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['username'], ['users.username'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('gallery_admin')
    op.drop_table('inventory')
    op.drop_table('inquiry')
    op.drop_table('gallery_home')
    # ### end Alembic commands ###
