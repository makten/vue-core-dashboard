using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using dashboard.Core.Models;

namespace dashboard.Extensions
{
    public static class IQuerableExtensions
    {

        public static IQueryable<T> ApplyOrdering<T>(this IQueryable<T> query, IQueryObject queryObj,  Dictionary<string, Expression<Func<T, object>>> columnsMap )
        {
            //Check for null or whitespace and if key exists
            if(String.IsNullOrWhiteSpace(queryObj.SortBy) || !columnsMap.ContainsKey(queryObj.SortBy))
                return query;

            if(queryObj.IsSortAscending)
                return query.OrderBy(columnsMap[queryObj.SortBy]);
            else                
                return query.OrderByDescending(columnsMap[queryObj.SortBy]);
        }
        
    }
}