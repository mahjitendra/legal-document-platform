from app.models.template import Template
from app.extensions import db

class TemplateService:
    @staticmethod
    def create_template(name, content, description=None, category=None):
        """Creates a new document template."""
        if not name or not content:
            raise ValueError('Name and content are required')
        if Template.query.filter_by(name=name).first():
            raise ValueError('Template with this name already exists')

        new_template = Template(
            name=name,
            content=content,
            description=description,
            category=category
        )
        db.session.add(new_template)
        db.session.commit()
        return new_template

    @staticmethod
    def get_all_templates():
        """Retrieves all templates."""
        return Template.query.all()

    @staticmethod
    def get_template_by_id(template_id):
        """Retrieves a single template by its ID."""
        return Template.query.get(template_id)

    @staticmethod
    def update_template(template, data):
        """Updates a template's attributes."""
        template.name = data.get('name', template.name)
        template.content = data.get('content', template.content)
        template.description = data.get('description', template.description)
        template.category = data.get('category', template.category)
        db.session.commit()
        return template

    @staticmethod
    def delete_template(template):
        """Deletes a template from the database."""
        db.session.delete(template)
        db.session.commit()