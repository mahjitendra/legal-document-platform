from app.extensions import ma
from app.models.template import Template

class TemplateSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Template
        load_instance = True

template_schema = TemplateSchema()
templates_schema = TemplateSchema(many=True)