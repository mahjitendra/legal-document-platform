from flask import request, jsonify
from app.models.document import Document
from app.models.template import Template
from sqlalchemy import or_

def search_documents(current_user):
    try:
        query = request.args.get('q', '')
        category = request.args.get('category')
        status = request.args.get('status')

        search_query = Document.query.filter_by(user_id=current_user.id)

        if query:
            search_query = search_query.filter(
                or_(
                    Document.title.ilike(f'%{query}%'),
                    Document.description.ilike(f'%{query}%'),
                    Document.content.ilike(f'%{query}%')
                )
            )

        if category:
            search_query = search_query.filter_by(category=category)

        if status:
            search_query = search_query.filter_by(status=status)

        documents = search_query.all()

        result = [{
            'id': doc.id,
            'title': doc.title,
            'description': doc.description,
            'category': doc.category,
            'status': doc.status,
            'created_at': doc.created_at.isoformat() if doc.created_at else None
        } for doc in documents]

        return jsonify({'documents': result, 'count': len(result)}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def search_templates(current_user):
    try:
        query = request.args.get('q', '')
        category = request.args.get('category')

        search_query = Template.query

        if query:
            search_query = search_query.filter(
                or_(
                    Template.name.ilike(f'%{query}%'),
                    Template.description.ilike(f'%{query}%')
                )
            )

        if category:
            search_query = search_query.filter_by(category=category)

        templates = search_query.all()

        result = [{
            'id': tpl.id,
            'name': tpl.name,
            'description': tpl.description,
            'category': tpl.category,
            'price': float(tpl.price) if tpl.price else 0
        } for tpl in templates]

        return jsonify({'templates': result, 'count': len(result)}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def global_search(current_user):
    try:
        query = request.args.get('q', '')

        if not query:
            return jsonify({'error': 'Search query is required'}), 400

        documents = Document.query.filter_by(user_id=current_user.id).filter(
            or_(
                Document.title.ilike(f'%{query}%'),
                Document.description.ilike(f'%{query}%')
            )
        ).limit(10).all()

        templates = Template.query.filter(
            or_(
                Template.name.ilike(f'%{query}%'),
                Template.description.ilike(f'%{query}%')
            )
        ).limit(10).all()

        result = {
            'documents': [{
                'id': doc.id,
                'title': doc.title,
                'type': 'document'
            } for doc in documents],
            'templates': [{
                'id': tpl.id,
                'name': tpl.name,
                'type': 'template'
            } for tpl in templates]
        }

        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
