"""empty message

Revision ID: 884c19442485
Revises: 9845085f7dfc
Create Date: 2023-01-23 20:14:36.234504

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '884c19442485'
down_revision = '9845085f7dfc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('room', schema=None) as batch_op:
        batch_op.add_column(sa.Column('player_sid', sa.String(), nullable=True))
        batch_op.create_unique_constraint(None, ['player_sid'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('room', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('player_sid')

    # ### end Alembic commands ###
