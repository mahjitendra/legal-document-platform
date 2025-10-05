from flask import request, jsonify
from app.services.template_service import TemplateService
from app.schemas.template_schema import template_schema, templates_schema
from app.utils.decorators import admin_required

@admin_required
def create_template():
    data = request.get_json()
    try:
        new_template = TemplateService.create_template(
            name=data.get('name'),
            content=data.get('content'),
            description=data.get('description'),
            category=data.get('category')
        )
        return jsonify(template_schema.dump(new_template)), 201
    except ValueError as e:
        return jsonify({'message': str(e)}), 400
    except Exception as e:
        return jsonify({'message': 'Could not create template'}), 500

def get_templates():
    templates = TemplateService.get_all_templates()
    return jsonify(templates_schema.dump(templates)), 200

def get_template(template_id):
    template = TemplateService.get_template_by_id(template_id)
    if template:
        return jsonify(template_schema.dump(template)), 200
    return jsonify({'message': 'Template not found'}), 404

@admin_required
def update_template(template_id):
    template = TemplateService.get_template_by_id(template_id)
    if not template:
        return jsonify({'message': 'Template not found'}), 404

    data = request.get_json()
    updated_template = TemplateService.update_template(template, data)
    return jsonify(template_schema.dump(updated_template)), 200

@admin_required
def delete_template(template_id):
    template = TemplateService.get_template_by_id(template_id)
    if not template:
        return jsonify({'message': 'Template not found'}), 404

    TemplateService.delete_template(template)
    return jsonify({'message': 'Template deleted successfully'}), 200