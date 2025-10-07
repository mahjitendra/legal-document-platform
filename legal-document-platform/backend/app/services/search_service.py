from app.models.document import Document
from app.models.template import Template
from sqlalchemy import or_, and_

class SearchService:
    @staticmethod
    def search_documents(user_id, query, filters=None):
        search_query = Document.query.filter_by(user_id=user_id)

        if query:
            search_query = search_query.filter(
                or_(
                    Document.title.ilike(f'%{query}%'),
                    Document.description.ilike(f'%{query}%'),
                    Document.content.ilike(f'%{query}%')
                )
            )

        if filters:
            if filters.get('category'):
                search_query = search_query.filter_by(category=filters['category'])

            if filters.get('status'):
                search_query = search_query.filter_by(status=filters['status'])

            if filters.get('start_date') and filters.get('end_date'):
                search_query = search_query.filter(
                    and_(
                        Document.created_at >= filters['start_date'],
                        Document.created_at <= filters['end_date']
                    )
                )

        return search_query.order_by(Document.created_at.desc()).all()

    @staticmethod
    def search_templates(query, filters=None):
        search_query = Template.query

        if query:
            search_query = search_query.filter(
                or_(
                    Template.name.ilike(f'%{query}%'),
                    Template.description.ilike(f'%{query}%')
                )
            )

        if filters:
            if filters.get('category'):
                search_query = search_query.filter_by(category=filters['category'])

            if filters.get('is_premium') is not None:
                search_query = search_query.filter_by(is_premium=filters['is_premium'])

        return search_query.order_by(Template.name).all()

    @staticmethod
    def global_search(user_id, query):
        documents = SearchService.search_documents(user_id, query)
        templates = SearchService.search_templates(query)

        return {
            'documents': documents[:10],
            'templates': templates[:10]
        }
