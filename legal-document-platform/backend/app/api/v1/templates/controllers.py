from flask import request, jsonify
from app.models.template import Template
from app.schemas.template_schema import template_schema, templates_schema
from app.extensions import db
from app.utils.decorators import admin_required

@admin_required
def create_template():
    data = request.get_json()
    name = data.get('name')
    content = data.get('content')

    if not name or not content:
        return jsonify({'message': 'Name and content are required'}), 400

    if Template.query.filter_by(name=name).first():
        return jsonify({'message': 'Template with this name already exists'}), 400

    new_template = Template(
        name=name,
        description=data.get('description'),
        content=content,
        category=data.get('category')
    )
    db.session.add(new_template)
    db.session.commit()

    return jsonify(template_schema.dump(new_template)), 201

def get_templates():
    templates = Template.query.all()
    return jsonify(templates_schema.dump(templates)), 200

def get_template(template_id):
    template = Template.query.get(template_id)
    if template:
        return jsonify(template_schema.dump(template)), 200
    return jsonify({'message': 'Template not found'}), 404

@admin_required
def update_template(template_id):
    template = Template.query.get(template_id)
    if not template:
        return jsonify({'message': 'Template not found'}), 404

    data = request.get_json()
    template.name = data.get('name', template.name)
    template.description = data.get('description', template.description)
    template.content = data.get('content', template.content)
    template.category = data.get('category', template.category)
    db.session.commit()

    return jsonify(template_schema.dump(template)), 200

@admin_required
def delete_template(template_id):
    template = Template.query.get(template_id)
    if not template:
        return jsonify({'message': 'Template not found'}), 404

    db.session.delete(template)
    db.session.commit()

    return jsonify({'message': 'Template deleted successfully'}), 200