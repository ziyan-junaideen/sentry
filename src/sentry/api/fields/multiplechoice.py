from __future__ import absolute_import

from rest_framework import serializers


invalid_choice_message = "Select a valid choice. {value} is not one of the available choices."


class MultipleChoiceField(serializers.Field):
    def __init__(self, choices=None, *args, **kwargs):
        self.choices = set(choices or ())
        super(MultipleChoiceField, self).__init__(*args, **kwargs)

    def to_representation(self, value):
        return value

    def to_internal_value(self, data):
        if isinstance(data, list):
            for item in data:
                if item not in self.choices:
                    raise serializers.ValidationError(invalid_choice_message.format(value=item))
            return data
        raise serializers.ValidationError("Please provide a valid list.")
