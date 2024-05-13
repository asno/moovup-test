import heapq

def find_all_paths(graph, start, end, path=[]):
    path = path + [start]
    
    if start == end:
        return [path]
    
    if start not in graph:
        return []
    
    all_paths = []
    
    for neighbor in graph[start]:
        if neighbor not in path:
            new_paths = find_all_paths(graph, neighbor, end, path)
            all_paths.extend(new_paths)
    
    return all_paths

def dijkstra(graph, start, end):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    
    pq = [(0, start)]
    
    predecessors = {}
    
    while pq:
        current_distance, current_node = heapq.heappop(pq)
        
        if current_node == end:
            break
        
        for neighbor, weight in graph[current_node].items():
            new_distance = current_distance + weight
            
            if new_distance < distances[neighbor]:
                distances[neighbor] = new_distance
                predecessors[neighbor] = current_node
                heapq.heappush(pq, (new_distance, neighbor))
    
    shortest_path = []
    current_node = end
    while current_node != start:
        shortest_path.insert(0, current_node)
        current_node = predecessors[current_node]
    shortest_path.insert(0, start)
    
    return shortest_path
