package com.employees.api.models.mappers;

import com.employees.api.models.dtos.Dto;
import com.employees.api.models.entities.BaseEntity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public interface BaseMapper<E extends BaseEntity, D extends Dto> {
    E toEntity(D dto);

    D toDto(E part);

    default Optional<D> toDto(Optional<E> entity) {
        return entity != null && entity.isPresent() ? Optional.ofNullable(toDto(entity.get())) : Optional.empty();
    }

    default Optional<E> toEntity(Optional<D> dto) {
        return dto != null && dto.isPresent() ? Optional.ofNullable(toEntity(dto.get())) : Optional.empty();
    }

    default List<D> toDtos(Collection<E> entities) {
        final List<D> result;
        if (entities != null) {
            result = entities.stream()
                    .map(this::toDto)
                    .collect(Collectors.toList());
        } else {
            result = new ArrayList<>();
        }
        return result;
    }

    default List<E> toEntities(Collection<D> dtos) {
        final List<E> result;
        if (dtos != null) {
            result = dtos.stream()
                    .map(this::toEntity)
                    .collect(Collectors.toList());
        } else {
            result = new ArrayList<>();
        }
        return result;
    }

    default List<D> toDtos(Iterable<E> entities) {
        final List<D> result;
        if (entities != null) {
            result = StreamSupport.stream(entities.spliterator(), false)
                    .map(this::toDto)
                    .collect(Collectors.toList());
        } else {
            result = new ArrayList<>();
        }
        return result;
    }

    default List<E> toEntities(Iterable<D> dtos) {
        final List<E> result;
        if (dtos != null) {
            result = StreamSupport.stream(dtos.spliterator(), false)
                    .map(this::toEntity)
                    .collect(Collectors.toList());
        } else {
            result = new ArrayList<>();
        }
        return result;
    }
}
