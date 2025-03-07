"""empty message

Revision ID: a9f304b5121c
Revises: 00ee9b64fde8
Create Date: 2025-03-05 12:15:21.195817

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a9f304b5121c'
down_revision = '00ee9b64fde8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('prifile_picture', sa.String(length=256), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('prifile_picture')

    # ### end Alembic commands ###
